export const normalizeMessage = (message: string) => {
    return message
        .replaceAll('_', '\\_')
        .replaceAll('|', '\\|')
        .replaceAll('.', '\\.')
        .replaceAll(':', '\\:')
        .replaceAll('{', '\\{')
        .replaceAll('}', '\\}')
        .replaceAll('=', '\\=')
        .replaceAll('+', '\\+')
        .replaceAll('>', '\\>')
        .replaceAll('<', '\\<')
        .replaceAll('-', '\\-')
        .replaceAll('!', '\\!');
};