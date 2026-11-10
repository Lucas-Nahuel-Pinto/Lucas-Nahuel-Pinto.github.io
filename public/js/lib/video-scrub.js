/**
 * Mouse/touch video scrubbing shared by the About background and the QA
 * slide: horizontal pointer travel maps to the video's currentTime.
 *
 * @param {object} options
 * @param {HTMLVideoElement} options.video
 * @param {number} [options.sensitivity] Fraction of the duration per full viewport width.
 * @param {() => boolean} [options.isEnabled] Guard for pages where the video is not always visible.
 */
export function createVideoScrub({ video, sensitivity = 0.8, isEnabled = () => true }) {
  let targetTime = 0;
  let isSeeking = false;
  let prevX = null;

  function duration() {
    return video && video.duration && !Number.isNaN(video.duration) ? video.duration : null;
  }

  function scrubTo(clientX) {
    const total = duration();
    if (!total || !isEnabled()) {
      prevX = clientX;
      return;
    }
    if (prevX === null) {
      prevX = clientX;
      return;
    }
    const delta = clientX - prevX;
    prevX = clientX;
    const offset = (delta / window.innerWidth) * sensitivity * total;
    const next = Math.max(0, Math.min(total, targetTime + offset));
    targetTime = next;
    if (!isSeeking) {
      isSeeking = true;
      video.currentTime = next;
    }
  }

  function resetAnchor() {
    prevX = null;
  }

  window.addEventListener('mousemove', (event) => scrubTo(event.clientX));
  window.addEventListener('mouseleave', resetAnchor);
  window.addEventListener(
    'touchmove',
    (event) => {
      const touch = event.touches[0];
      if (touch) scrubTo(touch.clientX);
    },
    { passive: true }
  );
  window.addEventListener('touchend', resetAnchor);

  if (video) {
    video.addEventListener('seeked', () => {
      if (Math.abs(video.currentTime - targetTime) > 0.02) {
        video.currentTime = targetTime;
      } else {
        isSeeking = false;
      }
    });

    video.addEventListener('loadedmetadata', () => {
      targetTime = video.currentTime || 0;
    });
  }

  return { resetAnchor };
}
