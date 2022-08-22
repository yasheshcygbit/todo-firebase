import { TitleInputProps } from '../interfaces';
function TitleInput({ title, id, name, type, onChange }: TitleInputProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">{title}</label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={name}
        required
        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
        placeholder={title}
        onChange={onChange}
      />
    </div>
  );
}

export default TitleInput;
