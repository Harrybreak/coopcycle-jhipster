import { IPanier } from '@/shared/model/panier.model';
import { ICommerce } from '@/shared/model/commerce.model';
import { ICooperative } from '@/shared/model/cooperative.model';

export interface IClientele {
  id?: number;
  paniers?: IPanier[] | null;
  commerce?: ICommerce[] | null;
  cooperative?: ICooperative | null;
}

export class Clientele implements IClientele {
  constructor(
    public id?: number,
    public paniers?: IPanier[] | null,
    public commerce?: ICommerce[] | null,
    public cooperative?: ICooperative | null
  ) {}
}
