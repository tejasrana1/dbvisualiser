export function getRandomColor() {
    // Generate random values for red, green, and blue with higher values for light shades
    const r = Math.floor(Math.random() * 106) + 100; // Random value between 200 and 255
    const g = Math.floor(Math.random() * 106) + 100; // Random value between 200 and 255
    const b = Math.floor(Math.random() * 106) + 100; // Random value between 200 and 255

    // Convert to hex format
    const color = `rgb(${r}, ${g}, ${b})`;

    return color;
}