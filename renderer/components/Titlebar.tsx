import {
  CLOSE_WINDOW,
  MINIMIZE,
  MAXIMIZE,
  RESTORE,
  MAKE_NON_INTERACTIVE,
} from "../../shared/constants"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faEye,
  faMinus,
  faWindowMaximize,
  faWindowRestore,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"

const Titlebar = ({
  setIsNonInteractable,
  setIsMaximized,
  isMenuDrawerOpen,
  setIsMenuDrawerOpen,
}) => {
  const handleButtonClick = (id: string) => {
    global.ipcRenderer.send(id)
    if (id === MAXIMIZE) {
      setIsMaximized(true)
    }
    if (id === RESTORE) {
      setIsMaximized(false)
    }
    if (id === MAKE_NON_INTERACTIVE) {
      setIsNonInteractable(true)
    }
  }

  return (
    <div id="titlebar" className={`  "titlebar"`}>
      <div id="drag-region" className="drag-region ">
        <div id="additional-controls">
          <div
            className="button"
            id="menu-button"
            onClick={() => setIsMenuDrawerOpen(!isMenuDrawerOpen)}
          >
            <FontAwesomeIcon className="icon" icon={faBars} />
          </div>
          <div
            className="button"
            id="hide-button"
            onClick={() => handleButtonClick(MAKE_NON_INTERACTIVE)}
          >
            <FontAwesomeIcon className="icon" icon={faEye} />
          </div>
        </div>

        <div id="window-title">
          <span>Notely</span>
        </div>

        <div id="window-controls">
          <div
            className="button"
            id="min-button"
            onClick={() => handleButtonClick(MINIMIZE)}
          >
            <FontAwesomeIcon className="icon" icon={faMinus} />
          </div>

          <div
            className="button"
            id="max-button"
            onClick={() => handleButtonClick(MAXIMIZE)}
          >
            <FontAwesomeIcon className="icon" icon={faWindowMaximize} />
          </div>

          <div
            className="button"
            id="restore-button"
            onClick={() => handleButtonClick(RESTORE)}
          >
            <FontAwesomeIcon className="icon" icon={faWindowRestore} />
          </div>

          <div
            className="button"
            id="close-button"
            onClick={() => handleButtonClick(CLOSE_WINDOW)}
          >
            <FontAwesomeIcon className="icon" icon={faXmark} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Titlebar
