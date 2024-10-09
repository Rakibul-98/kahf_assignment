import { Link } from "react-router-dom";

export default function Preview() {
  return (
    <div>
        <Link to="/">Back to editor</Link>
        <br />
        <button>Share link</button>
        <div>
            <h2>Preview</h2>
        </div>
    </div>
  )
}
