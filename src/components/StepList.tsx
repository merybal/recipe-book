//TODO revisar nombre del componente

interface StepListProps {
  steps: string;
}

const StepList = ({ steps }: StepListProps) => {
  return (
    <div>
      <h2>Procedimiento</h2>
      {/* TODO como renderizo el texto separado por parrafos desde un solo string */}
      <p>{steps}</p>
    </div>
  );
};

export default StepList;
