using System;
using System.Collections.Generic;
using UnityEngine;

namespace StyleGallery.GameUI
{
    public enum Ease { Linear, InQuad, OutQuad, InOutQuad, OutCubic, InOutCubic, OutQuart, OutBack }

    public static class EaseCurves
    {
        const float BackOvershoot = 1.70158f;

        public static float Evaluate(Ease ease, float t)
        {
            t = Mathf.Clamp01(t);
            switch (ease)
            {
                case Ease.InQuad: return t * t;
                case Ease.OutQuad: return 1f - (1f - t) * (1f - t);
                case Ease.InOutQuad: return t < 0.5f ? 2f * t * t : 1f - Mathf.Pow(-2f * t + 2f, 2f) / 2f;
                case Ease.OutCubic: return 1f - Mathf.Pow(1f - t, 3f);
                case Ease.InOutCubic: return t < 0.5f ? 4f * t * t * t : 1f - Mathf.Pow(-2f * t + 2f, 3f) / 2f;
                case Ease.OutQuart: return 1f - Mathf.Pow(1f - t, 4f);
                case Ease.OutBack:
                    float c3 = BackOvershoot + 1f;
                    return 1f + c3 * Mathf.Pow(t - 1f, 3f) + BackOvershoot * Mathf.Pow(t - 1f, 2f);
                default: return t;
            }
        }
    }

    public sealed class TweenHandle
    {
        internal float from;
        internal float to;
        internal float duration;
        internal float delay;
        internal float elapsed;
        internal Ease ease;
        internal Action<float> onUpdate;
        internal Action onComplete;

        public bool IsActive { get; internal set; } = true;
        public float Value { get; internal set; }

        public void Retarget(float target, float? newDuration = null)
        {
            from = Value;
            to = target;
            duration = newDuration ?? duration;
            delay = 0f;
            elapsed = 0f;
            IsActive = true;
            UITweenRunner.Ensure().Track(this);
        }

        public void Complete()
        {
            if (!IsActive)
                return;
            Value = to;
            onUpdate?.Invoke(Value);
            IsActive = false;
            onComplete?.Invoke();
        }

        public void Kill() => IsActive = false;

        internal void Step(float deltaTime)
        {
            if (delay > 0f)
            {
                delay -= deltaTime;
                return;
            }
            elapsed += deltaTime;
            float t = duration <= 0f ? 1f : elapsed / duration;
            Value = Mathf.LerpUnclamped(from, to, EaseCurves.Evaluate(ease, t));
            onUpdate?.Invoke(Value);
            if (t >= 1f)
            {
                IsActive = false;
                onComplete?.Invoke();
            }
        }
    }

    public static class UITween
    {
        public static bool ReducedMotion { get; set; }

        public static TweenHandle To(float from, float to, float duration, Ease ease, Action<float> onUpdate, Action onComplete = null, float delay = 0f)
        {
            var handle = new TweenHandle
            {
                from = from,
                to = to,
                duration = ReducedMotion ? 0f : duration,
                delay = ReducedMotion ? 0f : delay,
                ease = ease,
                onUpdate = onUpdate,
                onComplete = onComplete,
                Value = from,
            };
            if (handle.duration <= 0f && handle.delay <= 0f)
            {
                handle.Complete();
                return handle;
            }
            UITweenRunner.Ensure().Track(handle);
            return handle;
        }

        public static TweenHandle Fade(CanvasGroup group, float to, float duration, Ease ease = Ease.OutQuad, Action onComplete = null) =>
            To(group.alpha, to, duration, ease, value => group.alpha = value, onComplete);

        public static TweenHandle Scale(Transform target, float to, float duration, Ease ease = Ease.OutBack, Action onComplete = null) =>
            To(target.localScale.x, to, duration, ease, value => target.localScale = new Vector3(value, value, 1f), onComplete);
    }

    [DefaultExecutionOrder(-1000)]
    public sealed class UITweenRunner : MonoBehaviour
    {
        static UITweenRunner instance;
        readonly List<TweenHandle> active = new List<TweenHandle>();
        readonly List<TweenHandle> stepping = new List<TweenHandle>();

        public static UITweenRunner Ensure()
        {
            if (instance != null)
                return instance;
            var go = new GameObject(nameof(UITweenRunner)) { hideFlags = HideFlags.HideAndDontSave };
            if (Application.isPlaying)
                DontDestroyOnLoad(go);
            instance = go.AddComponent<UITweenRunner>();
            return instance;
        }

        internal void Track(TweenHandle handle)
        {
            if (!active.Contains(handle))
                active.Add(handle);
        }

        void Update()
        {
            stepping.Clear();
            stepping.AddRange(active);
            foreach (var handle in stepping)
            {
                if (handle.IsActive)
                    handle.Step(Time.unscaledDeltaTime);
            }
            active.RemoveAll(handle => !handle.IsActive);
        }
    }
}
