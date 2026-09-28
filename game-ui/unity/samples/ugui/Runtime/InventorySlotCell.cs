using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace StyleGallery.GameUI
{
    public class InventorySlotCell : MonoBehaviour, IGridCell
    {
        [SerializeField] Image icon;
        [SerializeField] TMP_Text count;
        [SerializeField] Button button;

        public static Func<int, (Sprite icon, int count)> Source;
        public static event Action<int> Clicked;

        int boundIndex = -1;

        void Awake()
        {
            button.onClick.AddListener(() => Clicked?.Invoke(boundIndex));
        }

        public void Bind(int index)
        {
            boundIndex = index;
            var (sprite, amount) = Source != null ? Source(index) : (null, 0);
            icon.sprite = sprite;
            icon.enabled = sprite != null;
            count.gameObject.SetActive(amount > 1);
            if (amount > 1)
                count.SetText("{0}", (float)amount);
        }
    }
}
