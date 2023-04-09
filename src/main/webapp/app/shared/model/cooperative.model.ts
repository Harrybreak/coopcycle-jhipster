import { IClientele } from '@/shared/model/clientele.model';
import { ILivraison } from '@/shared/model/livraison.model';
import { ICommerce } from '@/shared/model/commerce.model';

export interface ICooperative {
  id?: number;
  nom?: string;
  canton?: string;
  clienteles?: IClientele[] | null;
  livraisons?: ILivraison[] | null;
  commerce?: ICommerce[] | null;
  commerce?: ICommerce[] | null;
}

export class Cooperative implements ICooperative {
  constructor(
    public id?: number,
    public nom?: string,
    public canton?: string,
    public clienteles?: IClientele[] | null,
    public livraisons?: ILivraison[] | null,
    public commerce?: ICommerce[] | null,
    public commerce?: ICommerce[] | null
  ) {}
}
