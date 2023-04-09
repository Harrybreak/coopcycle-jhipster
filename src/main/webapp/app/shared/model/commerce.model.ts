import { IPanier } from '@/shared/model/panier.model';
import { ICooperative } from '@/shared/model/cooperative.model';
import { IClientele } from '@/shared/model/clientele.model';

import { Theme } from '@/shared/model/enumerations/theme.model';
export interface ICommerce {
  id?: number;
  nom?: string;
  theme?: Theme | null;
  site?: string | null;
  paniers?: IPanier[] | null;
  cooperative?: ICooperative | null;
  cooperative?: ICooperative | null;
  clienteles?: IClientele[] | null;
}

export class Commerce implements ICommerce {
  constructor(
    public id?: number,
    public nom?: string,
    public theme?: Theme | null,
    public site?: string | null,
    public paniers?: IPanier[] | null,
    public cooperative?: ICooperative | null,
    public cooperative?: ICooperative | null,
    public clienteles?: IClientele[] | null
  ) {}
}
