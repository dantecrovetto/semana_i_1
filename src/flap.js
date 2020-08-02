/**
 * Flap with space
 */
function keyPressed() {
  if (key === ' ') {
    bird.flap()

    playSong()
  }
}

/**
 * Handle posenet
 */
let hasFlappedUp = false
document.querySelector('#start-button').addEventListener('click', () => {
  $message.innerHTML = 'Loading PoseNet'

  playSong()

  video = createCapture(VIDEO)
  video.hide()

  posenet = ml5.poseNet(
    video,
    () => {
      document.querySelector('#button-wrap').style.display = 'none'
    },
    { maxPoseDetections: 1 }
  )

  posenet.on('pose', poses => {
    pose = poses[0].pose

    // Detect up flap
    if (
      pose.keypoints[9].position.y < pose.keypoints[5].position.y + 40 &&
      pose.keypoints[10].position.y < pose.keypoints[6].position.y + 40
    ) {
      hasFlappedUp = true
    }

    // Detect down flap
    if (
      hasFlappedUp &&
      pose.keypoints[9].position.y > pose.keypoints[5].position.y + 40 &&
      pose.keypoints[10].position.y > pose.keypoints[6].position.y + 40
    ) {
      hasFlappedUp = false
      bird.flap()
    }
  })
})
