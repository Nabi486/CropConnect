type Props = {
  title: string;
  description: string;
};

export default function Card({
  title,
  description,
}: Props) {
  return (
    <div className="border p-6 rounded-lg shadow">
      <h3 className="font-bold text-xl mb-2">
        {title}
      </h3>

      <p>{description}</p>
    </div>
  );
}