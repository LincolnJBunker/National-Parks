
function ConfirmDelete({ show, handleClose, handleConfirm}) {
  return (
    <div className={show ? 'modal display-block' : 'modal display-none'}>
        <div className="modal-content">
            <p>Do you really wan to delete your profile?</p>
            <div className="button-container">
                <button className="delete-button" onClick={handleConfirm}>Delete</button>
                <button className="cancel-button" onClick={handleClose}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmDelete