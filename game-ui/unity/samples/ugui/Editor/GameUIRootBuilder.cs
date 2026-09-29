using UnityEditor;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
#if ENABLE_INPUT_SYSTEM
using UnityEngine.InputSystem.UI;
#endif

namespace StyleGallery.GameUI.Editor
{
    public static class GameUIRootBuilder
    {
        static readonly (string name, int order)[] Layers =
        {
            ("Canvas_HUD", 0),
            ("Canvas_Screens", 10),
            ("Canvas_Modal", 20),
            ("Canvas_System", 30),
        };

        [MenuItem("Tools/StyleGallery/Create Game UI Root")]
        public static void Create()
        {
            var root = new GameObject("GameUIRoot");
            Undo.RegisterCreatedObjectUndo(root, "Create Game UI Root");

            if (Object.FindFirstObjectByType<EventSystem>() == null)
            {
                var es = new GameObject("EventSystem", typeof(EventSystem));
#if ENABLE_INPUT_SYSTEM
                es.AddComponent<InputSystemUIInputModule>();
#else
                es.AddComponent<StandaloneInputModule>();
#endif
                es.transform.SetParent(root.transform, false);
            }

            foreach (var (name, order) in Layers)
            {
                var go = new GameObject(name, typeof(RectTransform), typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
                go.transform.SetParent(root.transform, false);
                go.layer = LayerMask.NameToLayer("UI");

                var canvas = go.GetComponent<Canvas>();
                canvas.renderMode = RenderMode.ScreenSpaceOverlay;
                canvas.sortingOrder = order;

                var scaler = go.GetComponent<CanvasScaler>();
                scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
                scaler.referenceResolution = new Vector2(1920, 1080);
                scaler.screenMatchMode = CanvasScaler.ScreenMatchMode.MatchWidthOrHeight;
                scaler.matchWidthOrHeight = 0.5f;

                var safe = new GameObject("SafeArea", typeof(RectTransform), typeof(SafeAreaFitter));
                safe.transform.SetParent(go.transform, false);
                var rt = (RectTransform)safe.transform;
                rt.anchorMin = Vector2.zero;
                rt.anchorMax = Vector2.one;
                rt.offsetMin = rt.offsetMax = Vector2.zero;

                if (name == "Canvas_HUD")
                    go.GetComponent<GraphicRaycaster>().enabled = false;
                if (name == "Canvas_Screens")
                    go.AddComponent<UIScreenRouter>();
            }

            Selection.activeGameObject = root;
        }
    }
}
