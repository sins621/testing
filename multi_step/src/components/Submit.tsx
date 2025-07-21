interface SubmitProps {
  text: string;
}

export default function Submit({ text }: SubmitProps) {
  return (
    <button className="bg-teal-500 text-white px-4 rounded-md py-5" type="submit">{text}</button>
  )
}