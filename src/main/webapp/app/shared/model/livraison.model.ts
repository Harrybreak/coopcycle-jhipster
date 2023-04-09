import { IPanier } from '@/shared/model/panier.model';
import { ICooperative } from '@/shared/model/cooperative.model';

export interface ILivraison {
  id?: number;
  identite?: string;
  vehicule?: string | null;
  disponible?: boolean;
  panier?: IPanier | null;
  cooperative?: ICooperative | null;
}

export class Livraison implements ILivraison {
  constructor(
    public id?: number,
    public identite?: string,
    public vehicule?: string | null,
    public disponible?: boolean,
    public panier?: IPanier | null,
    public cooperative?: ICooperative | null
  ) {
    this.disponible = this.disponible ?? false;
  }
}
