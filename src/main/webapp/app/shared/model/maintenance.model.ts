import { TypeMaintenance } from '@/shared/model/enumerations/type-maintenance.model';
export interface IMaintenance {
  id?: number;
  categorie?: TypeMaintenance | null;
}

export class Maintenance implements IMaintenance {
  constructor(public id?: number, public categorie?: TypeMaintenance | null) {}
}
