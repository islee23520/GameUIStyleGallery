using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace StyleGallery.GameUI
{
    public class HudResourceBar : MonoBehaviour
    {
        [SerializeField] Image fill;
        [SerializeField] Image trailingFill;
        [SerializeField] TMP_Text label;
        [SerializeField] float trailingSpeed = 1.5f;

        float target = 1f;
        int shownCurrent = -1;
        int shownMax = -1;

        public void Set(int current, int max)
        {
            max = Mathf.Max(1, max);
            current = Mathf.Clamp(current, 0, max);
            target = (float)current / max;
            fill.fillAmount = target;
            if (trailingFill != null && trailingFill.fillAmount < target)
                trailingFill.fillAmount = target;
            if (label != null && (current != shownCurrent || max != shownMax))
            {
                shownCurrent = current;
                shownMax = max;
                label.SetText("{0}/{1}", (float)current, (float)max);
            }
        }

        void Update()
        {
            if (trailingFill == null || Mathf.Approximately(trailingFill.fillAmount, target))
                return;
            trailingFill.fillAmount = Mathf.MoveTowards(trailingFill.fillAmount, target, trailingSpeed * Time.unscaledDeltaTime);
        }
    }
}
