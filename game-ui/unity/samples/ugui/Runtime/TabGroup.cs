using System;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using UnityEngine.Events;

namespace StyleGallery.GameUI
{
    public class TabGroup : MonoBehaviour
    {
        [Serializable]
        public struct Tab
        {
            public Toggle toggle;
            public GameObject page;
            public Selectable firstSelectedInPage;
        }

        [SerializeField] Tab[] tabs = Array.Empty<Tab>();
        [SerializeField] int initialIndex;
        UnityAction<bool>[] listeners;

        public int Current { get; private set; } = -1;

        void Start()
        {
            listeners = new UnityAction<bool>[tabs.Length];
            for (int i = 0; i < tabs.Length; i++)
            {
                int index = i;
                listeners[i] = isOn => { if (isOn) Select(index); };
                tabs[i].toggle.onValueChanged.AddListener(listeners[i]);
            }
            Select(Mathf.Clamp(initialIndex, 0, Mathf.Max(0, tabs.Length - 1)));
        }

        void OnDestroy()
        {
            if (listeners == null)
                return;
            for (int i = 0; i < tabs.Length; i++)
                if (tabs[i].toggle != null)
                    tabs[i].toggle.onValueChanged.RemoveListener(listeners[i]);
        }

        public void Step(int direction)
        {
            if (tabs.Length == 0)
                return;
            Select((Current + direction + tabs.Length) % tabs.Length);
        }

        public void Select(int index)
        {
            if (index < 0 || index >= tabs.Length || index == Current)
                return;
            Current = index;
            for (int i = 0; i < tabs.Length; i++)
            {
                tabs[i].toggle.SetIsOnWithoutNotify(i == index);
                tabs[i].page.SetActive(i == index);
            }
            var first = tabs[index].firstSelectedInPage;
            if (first != null && EventSystem.current != null)
                EventSystem.current.SetSelectedGameObject(first.gameObject);
        }
    }
}
