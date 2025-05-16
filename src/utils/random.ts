export const generateRandomCPF = () => {
    const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    
    n.push(
        (n[0] * 10 + n[1] * 9 + n[2] * 8 + n[3] * 7 + n[4] * 6 + n[5] * 5 + n[6] * 4 + n[7] * 3 + n[8] * 2) % 11
    );
    n[9] = n[9] < 2 ? 0 : 11 - n[9];
    n.push(
        (n[0] * 11 + n[1] * 10 + n[2] * 9 + n[3] * 8 + n[4] * 7 + n[5] * 6 + n[6] * 5 + n[7] * 4 + n[8] * 3 + n[9] * 2) % 11
    );
    n[10] = n[10] < 2 ? 0 : 11 - n[10];
    
    return n.join('');
}

export const generateRandomCNPJ = () => {
    const n = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
    n.push(0, 0, 0, 1); 
    
    const d1 = calculateDigit(n, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    n.push(d1);
    
    const d2 = calculateDigit(n, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    n.push(d2);
    
    return n.join('');
}

export const calculateDigit = (numbers: number[], weights: number[]) => {
    const sum = numbers.reduce((acc, num, idx) => acc + num * weights[idx], 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
}

export const generateRandonNumberWithSize = (size: number) => {
    const array = Array.from({length: size}, () => Math.floor(Math.random() * 10))
    return Number(array.join(''))
}

export const getRandomLetter = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  }