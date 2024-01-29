//TODO revisar nombre del componente, Process? StepsBody? Instructions
import "./tempstyling.css";

interface StepListProps {
  steps: string;
}

const StepList = ({ steps }: StepListProps) => {
  const replaceWithBr = () => {
    return steps.replace(/\n/g, "<br />");
  };

  return (
    <div>
      <h2>Procedimiento</h2>
      {/* TODO como renderizo el texto separado por parrafos desde un solo string */}
      {/* <p className="text-body">{steps}</p> */}
      <p
        className="text-body"
        dangerouslySetInnerHTML={{ __html: replaceWithBr() }}
      />
    </div>
  );
};

export default StepList;
