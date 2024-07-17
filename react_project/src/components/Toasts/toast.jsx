import { useEffect } from "react";
import { Toast as BootstrapToast } from "bootstrap";

export default function Toast({ message }) {
    useEffect(() => {
        const toastElement = document.getElementById("liveToast");
        const toast = new BootstrapToast(toastElement);
        toast.show();
    }, []);

    return (
        <div className="position-fixed top-0 start-50 translate-middle-x p-3" style={{ zIndex: 11 }}>
            <div
                id="liveToast"
                className="toast"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="toast-header">
                    <img src="..." className="rounded me-2" alt="..." />
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    />
                </div>
                <div className="toast-body">{message}</div>
            </div>
        </div>
    );
}
