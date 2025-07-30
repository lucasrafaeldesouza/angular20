export interface MenuItem {
    icon: string;
    opaeDsc: string;
    link?: string;
    vestrutAcessoUsuarItens?: MenuItem[];
    isOpen?: boolean;
}