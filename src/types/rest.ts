export type Developer = {
  id: number;
  name: string;
};

export type Status = {
  id: number;
  name: string;
};

export type LocationAddInputs = {
  locationName: string;
  developer: string;
  status: string;
  issueDate: string;
  inspectionDate: string;
  deforestationDate: string;
  deforestationDone: boolean;
  plantingDate: string;
  plantingDone: boolean;
};
