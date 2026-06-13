export const GENDER = {
  0: '',
  1: '여성',
  2: '남성',
  3: '논 바이너리'
} as const;
export type GenderCode = keyof typeof GENDER;

export const DEPARTMENT = {
  Acting: '배우',
  Directing: '감독',
  Writing: '작가',
  Production: '제작'
} as const;
export type DepartmentCode = keyof typeof DEPARTMENT;

export interface Cast {
  adult: boolean,
  gender: GenderCode,
  id: number,
  known_for_department: DepartmentCode,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  cast_id: number,
  character: string,
  credit_id: string,
  order: number
}

export interface Crew {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string
  name: string
  original_name: string
  popularity: number,
  profile_path: string
  credit_id: string
  department: string
  job: string
}

export interface Credit {
  cast: Cast[];
  crew: Crew[]
}