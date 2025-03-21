import { RunningLine } from "../components/RunningLine";

export const Loader = () => {
	return (
		<div className="loader" data-loader>
			<RunningLine className="loader__running-line" speed="60s">VeraTarget</RunningLine>
		</div>
	)
};