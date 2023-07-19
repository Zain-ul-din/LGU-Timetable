export default function handleGlowBlob(e: any) {
    const y = e.clientY,
        x = e.clientX;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
}
