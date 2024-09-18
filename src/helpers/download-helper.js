export const download = (data, filename) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    // Создаем ссылку
    const link = document.createElement('a');
    link.href = url;
    // Задаем имя файла
    link.setAttribute('download', filename);
    // Добавляем ссылку в DOM и симулируем клик
    document.body.appendChild(link);
    link.click();
    // Удаляем ссылку из DOM
    document.body.removeChild(link);
}