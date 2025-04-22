export default function UserInfo({
  email,
  phone,
  address,
}: {
  email: string;
  phone: string;
  address: string;
}) {
  return (
    <div className="w-full bg-quaternary/40 dark:bg-quinary/40 p-4 rounded-2xl border borders shadow-md">
      <h2 className="text-lg font-bold mb-3 border-b pb-1">Información personal</h2>
      <ul className="space-y-1 font-semibold">
        <li>Email: {email}</li>
        <li>Teléfono: {phone}</li>
        <li>Dirección: {address}</li>
      </ul>
    </div>
  );
}
