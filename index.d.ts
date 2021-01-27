declare module "tamako-api" {
export class API {

    public chatbot(message: string, name: string, gender: string, userid: string, prefix: string, dev: string): Promise<string>;
    public lyrics(name: string): Promise<Object>;
    public pokemon(name: string): Promise<Object>;
    public animequote(): Promise<String>;
    public animalfact(name: string): Promise<Object>;
    public image(category: string): Promise<Object>;
    public joke(): Promise<String>;
    public on(error): error
}

export const version: string;
}
