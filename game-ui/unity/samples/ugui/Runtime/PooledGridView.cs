using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace StyleGallery.GameUI
{
    public interface IGridCell
    {
        void Bind(int index);
    }

    [RequireComponent(typeof(ScrollRect))]
    public class PooledGridView : MonoBehaviour
    {
        [SerializeField] RectTransform cellPrefab;
        [SerializeField] Vector2 cellSize = new Vector2(96, 96);
        [SerializeField] Vector2 spacing = new Vector2(8, 8);
        [SerializeField] int columns = 5;

        ScrollRect scroll;
        readonly List<RectTransform> cells = new List<RectTransform>();
        readonly Dictionary<RectTransform, IGridCell> binders = new Dictionary<RectTransform, IGridCell>();
        int itemCount;
        int firstRow = -1;

        void Awake()
        {
            scroll = GetComponent<ScrollRect>();
            scroll.onValueChanged.AddListener(_ => Refresh(false));
        }

        public void SetItemCount(int count)
        {
            itemCount = Mathf.Max(0, count);
            columns = Mathf.Max(1, columns);
            int rows = Mathf.CeilToInt(itemCount / (float)columns);
            var content = scroll.content;
            content.anchorMin = new Vector2(0, 1);
            content.anchorMax = new Vector2(0, 1);
            content.pivot = new Vector2(0, 1);
            content.sizeDelta = new Vector2(columns * (cellSize.x + spacing.x) - spacing.x, Mathf.Max(0, rows * (cellSize.y + spacing.y) - spacing.y));
            EnsurePool();
            Refresh(true);
        }

        void EnsurePool()
        {
            float viewport = scroll.viewport != null ? scroll.viewport.rect.height : ((RectTransform)transform).rect.height;
            int visibleRows = Mathf.CeilToInt(viewport / (cellSize.y + spacing.y)) + 1;
            int needed = visibleRows * columns;
            while (cells.Count < needed)
            {
                var cell = Instantiate(cellPrefab, scroll.content);
                cell.anchorMin = cell.anchorMax = cell.pivot = new Vector2(0, 1);
                cell.sizeDelta = cellSize;
                binders[cell] = cell.GetComponent<IGridCell>() ?? throw new InvalidOperationException("Cell prefab needs an IGridCell component.");
                cells.Add(cell);
            }
        }

        void Refresh(bool force)
        {
            float rowHeight = cellSize.y + spacing.y;
            int row = Mathf.Clamp(Mathf.FloorToInt(scroll.content.anchoredPosition.y / rowHeight), 0, Mathf.Max(0, Mathf.CeilToInt(itemCount / (float)columns) - cells.Count / columns));
            if (!force && row == firstRow)
                return;
            firstRow = row;
            for (int i = 0; i < cells.Count; i++)
            {
                int index = row * columns + i;
                var cell = cells[i];
                bool visible = index < itemCount;
                cell.gameObject.SetActive(visible);
                if (!visible)
                    continue;
                int r = index / columns;
                int c = index % columns;
                cell.anchoredPosition = new Vector2(c * (cellSize.x + spacing.x), -r * rowHeight);
                binders[cell].Bind(index);
            }
        }
    }
}
