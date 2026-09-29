using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

namespace StyleGallery.GameUI
{
    public class UIScreenRouter : MonoBehaviour
    {
        [SerializeField] EventSystem eventSystem;
        [SerializeField] UIScreen initialScreen;
        [SerializeField] string cancelButton = "Cancel";

        readonly Stack<UIScreen> stack = new Stack<UIScreen>();

        public UIScreen Top => stack.Count > 0 ? stack.Peek() : null;
        public int Depth => stack.Count;

        void Start()
        {
            if (initialScreen != null)
                Push(initialScreen);
        }

#if ENABLE_LEGACY_INPUT_MANAGER
        void Update()
        {
            if (!string.IsNullOrEmpty(cancelButton) && Input.GetButtonDown(cancelButton))
                HandleCancel();
        }
#endif

        public void Push(UIScreen screen)
        {
            if (screen == null || screen.IsOpen)
                return;
            if (Top != null)
            {
                if (screen.IsModal)
                    Top.SetInteractable(false);
                else
                    Top.Suspend(eventSystem);
            }
            stack.Push(screen);
            screen.Open(eventSystem);
        }

        public void Pop()
        {
            if (stack.Count <= 1)
                return;
            var closing = stack.Pop();
            closing.Close(eventSystem);
            var revealed = Top;
            if (closing.IsModal)
                revealed.SetInteractable(true);
            else
                revealed.Resume(eventSystem);
        }

        public void Replace(UIScreen screen)
        {
            while (stack.Count > 0)
                stack.Pop().Close(null);
            Push(screen);
        }

        public void HandleCancel()
        {
            if (Top != null && Top.CloseOnCancel)
                Pop();
        }
    }
}
