function getRandomSong() {
  const randomIndex = Math.floor(Math.random() * 11) + 1;
  return `song${randomIndex}.mp3`;
}
