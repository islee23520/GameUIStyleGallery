using UnityEngine;
using UnityEngine.EventSystems;

namespace StyleGallery.GameUI
{
    [RequireComponent(typeof(CanvasGroup))]
    public class UIScreen : MonoBehaviour
    {
        [SerializeField] GameObject firstSelected;
        [SerializeField] bool isModal;
        [SerializeField] bool closeOnCancel = true;

        CanvasGroup group;
        GameObject selectionBeforeOpen;
        GameObject selectionBeforeSuspend;

        public bool IsModal => isModal;
        public bool CloseOnCancel => closeOnCancel;
        public bool IsOpen { get; private set; }

        protected virtual void Awake()
        {
            group = GetComponent<CanvasGroup>();
            SetVisible(false);
        }

        public void Open(EventSystem eventSystem)
        {
            selectionBeforeOpen = eventSystem != null ? eventSystem.currentSelectedGameObject : null;
            transform.SetAsLastSibling();
            SetVisible(true);
            IsOpen = true;
            OnOpened();
            if (eventSystem != null && firstSelected != null)
                eventSystem.SetSelectedGameObject(firstSelected);
        }

        public void Close(EventSystem eventSystem)
        {
            SetVisible(false);
            IsOpen = false;
            OnClosed();
            if (eventSystem != null && selectionBeforeOpen != null && selectionBeforeOpen.activeInHierarchy)
                eventSystem.SetSelectedGameObject(selectionBeforeOpen);
        }

        public void Suspend(EventSystem eventSystem)
        {
            selectionBeforeSuspend = eventSystem != null ? eventSystem.currentSelectedGameObject : null;
            SetVisible(false);
        }

        public void Resume(EventSystem eventSystem)
        {
            SetVisible(true);
            if (eventSystem != null && selectionBeforeSuspend != null && selectionBeforeSuspend.activeInHierarchy)
                eventSystem.SetSelectedGameObject(selectionBeforeSuspend);
        }

        public void SetInteractable(bool value)
        {
            group.interactable = value;
            group.blocksRaycasts = value;
        }

        protected virtual void OnOpened() { }
        protected virtual void OnClosed() { }

        void SetVisible(bool visible)
        {
            group.alpha = visible ? 1f : 0f;
            group.interactable = visible;
            group.blocksRaycasts = visible;
        }
    }
}
