export default function Loading() {
  return (
    <main className="atlas-loading-screen" role="status" aria-live="polite">
      <div className="atlas-loader">
        <div className="atlas-tire" aria-hidden="true">
          <span className="atlas-tire-rim">
            <span className="atlas-tire-hub" />
          </span>
        </div>
        <span className="atlas-loader-brand">
          MOTOR <b>ATLAS</b>
        </span>
        <p>Finding the road ahead</p>
        <span className="atlas-loader-track" aria-hidden="true">
          <span />
        </span>
      </div>
      <span className="atlas-loader-caption" aria-hidden="true">
        ROAD · RIDE · ROAM
      </span>
    </main>
  );
}
