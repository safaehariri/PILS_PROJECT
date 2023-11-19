document.addEventListener('DOMContentLoaded', function() {
    const percentage1 = 15;
    const percentage2 = 20;
    const percentage3 = 65;
  
    // Calculate rotation angles in degrees
    const angle1 = (percentage1 / 100) * 360;
    const angle2 = (percentage2 / 100) * 360;
    const angle3 = (percentage3 / 100) * 360;
  
    // Apply rotations to progress circles
    updateProgressCircle('progressCircle1', angle1);
    updateProgressCircle('progressCircle2', angle2);
    updateProgressCircle('progressCircle3', angle3);
  
    // Set initial positions and update the content of progress text
    updateProgressText('progressText1', `${percentage1}%`, 0);
    updateProgressText('progressText2', `${percentage2}%`, 0); // Adjust the angle as needed
    updateProgressText('progressText3', `${percentage3}%`, 0); // Adjust the angle as needed
  });
  
  // Function to update the rotation of the progress circle
  function updateProgressCircle(circleId, angle) {
    const progressCircle = document.getElementById(circleId);
    if (progressCircle) {
      progressCircle.style.transform = `rotate(${angle}deg)`;
    }
  }
  
  // Function to set initial position and update the content of progress text
  function updateProgressText(textId, content, initialAngle) {
    const progressText = document.getElementById(textId);
    if (progressText) {
      // Set initial position
      progressText.style.transform = `rotate(${initialAngle}deg)`;
  
      // Update the content
      progressText.innerText = content;
    }
  }
  