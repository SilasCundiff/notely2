import { Dispatch, SetStateAction } from "react"

export interface AppInteractiveContextInterface {
  isNonInteractable: boolean
  setIsNonInteractable?: Dispatch<SetStateAction<boolean>>
  isMaximized: boolean
  setIsMaximized?: Dispatch<SetStateAction<boolean>>
}
