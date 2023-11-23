document.addEventListener('DOMContentLoaded', function() {
  const percentage1 = 25;
  const percentage2 = 50;
  const percentage3 = 75;

  // Calculate rotation angles in degrees
  const angle1 = (percentage1 / 100) * 360;
  const angle2 = (percentage2 / 100) * 360;
  const angle3 = (percentage3 / 100) * 360;

  // Apply rotations to progress circles
  updateProgressCircle('progressCircle1', angle1);
  updateProgressCircle('progressCircle2', angle2);
  updateProgressCircle('progressCircle3', angle3);

  // Définir le contenu textuel pour les textes de progression
  updateProgressText('progressText1', `${percentage1}%`, angle1);
  updateProgressText('progressText2', `${percentage2}%`, angle2);
  updateProgressText('progressText3', `${percentage3}%`, angle3);
});

// Fonction pour mettre à jour la rotation du cercle de progression en fonction du pourcentage
function updateProgressCircle(circleId, angle) {
  const progressCircle = document.getElementById(circleId);
  if (progressCircle) {
    progressCircle.style.transform = `rotate(${angle}deg)`;
  }
}

// Fonction pour mettre à jour le contenu textuel et la position du texte en fonction du pourcentage et de l'angle
function updateProgressText(textId, content, angle) {
  const progressText = document.getElementById(textId);
  if (progressText) {
    // Calculer la position du texte en fonction de l'angle
    const textPosition = calculateTextPosition(angle);

    // Appliquer la position au texte
    progressText.style.left = `${textPosition.x}px`;
    progressText.style.top = `${textPosition.y}px`;

    // Mettre à jour le contenu textuel
    progressText.innerText = content;
  }
}

// Fonction pour calculer la position du texte en fonction de l'angle du cercle
function calculateTextPosition(angle) {
  // Rayon du cercle (peut être ajusté en fonction de la conception)
  const radius = 50;

  // Convertir l'angle en radians
  const radians = (angle * Math.PI) / 180;

  // Calculer les coordonnées du texte en fonction de l'angle
  const x = radius * Math.cos(radians);
  const y = radius * Math.sin(radians);

  return { x, y };
}