import { ILivraison } from '@/shared/model/livraison.model';
import { IClientele } from '@/shared/model/clientele.model';
import { ICommerce } from '@/shared/model/commerce.model';

import { EtatLivraison } from '@/shared/model/enumerations/etat-livraison.model';
import { Paiement } from '@/shared/model/enumerations/paiement.model';
export interface IPanier {
  id?: number;
  etat?: EtatLivraison;
  paiement?: Paiement;
  dateCommande?: Date | null;
  livraison?: ILivraison | null;
  clientele?: IClientele | null;
  commerce?: ICommerce | null;
}

export class Panier implements IPanier {
  constructor(
    public id?: number,
    public etat?: EtatLivraison,
    public paiement?: Paiement,
    public dateCommande?: Date | null,
    public livraison?: ILivraison | null,
    public clientele?: IClientele | null,
    public commerce?: ICommerce | null
  ) {}
}
