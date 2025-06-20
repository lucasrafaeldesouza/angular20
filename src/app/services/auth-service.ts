import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Função auxiliar para converter PEM para SPKI
  public pemToSpki(pem: string): ArrayBuffer {
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = pem.replace(pemHeader, '').replace(pemFooter, '').replace(/\s+/g, '');
    const binaryDerString = atob(pemContents);
    const binaryDer = new Uint8Array(binaryDerString.length);
    for (let i = 0; i < binaryDerString.length; i++) {
      binaryDer[i] = binaryDerString.charCodeAt(i);
    }
    return binaryDer.buffer;
  }

  // Importar chave pública
  public async importPublicKey(pem: string): Promise<CryptoKey> {
    const spki = this.pemToSpki(pem);
    return await crypto.subtle.importKey(
      'spki',
      spki,
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256'
      },
      true,
      ['encrypt']
    );
  }

  // Criptografar dados
  public async encryptData(publicKey: CryptoKey, data: string): Promise<string> {
    const encoded = new TextEncoder().encode(data);
    const encrypted = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, encoded);
    const encryptedBytes = new Uint8Array(encrypted);
    return btoa(String.fromCharCode(...encryptedBytes)); // Base64
  }
  
}
