using UnityEngine;

namespace StyleGallery.GameUI
{
    [ExecuteAlways]
    [RequireComponent(typeof(RectTransform))]
    public class SafeAreaFitter : MonoBehaviour
    {
        RectTransform rect;
        Rect appliedArea;
        Vector2Int appliedScreen;

        void OnEnable()
        {
            rect = GetComponent<RectTransform>();
            Apply();
        }

        void Update()
        {
            if (Screen.safeArea != appliedArea || Screen.width != appliedScreen.x || Screen.height != appliedScreen.y)
                Apply();
        }

        void Apply()
        {
            appliedArea = Screen.safeArea;
            appliedScreen = new Vector2Int(Screen.width, Screen.height);
            if (Screen.width <= 0 || Screen.height <= 0)
                return;
            var min = appliedArea.position;
            var max = appliedArea.position + appliedArea.size;
            min.x /= Screen.width;
            min.y /= Screen.height;
            max.x /= Screen.width;
            max.y /= Screen.height;
            rect.anchorMin = min;
            rect.anchorMax = max;
            rect.offsetMin = Vector2.zero;
            rect.offsetMax = Vector2.zero;
        }
    }
}
