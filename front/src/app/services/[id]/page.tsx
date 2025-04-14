import ServiceProviderUser from "@/components/ServiceProviderUser/ServiceProviderUser";
import { getServiceProfileById } from "@/services/profileService";

interface ProductParams {
  id: string;
}

const SlugProduct = async ({ params }: { params: ProductParams }) => {

  const { id } = await params;
  console.log("params:", params);
  console.log("ID recibido en SlugProduct:", id);

  const user = await getServiceProfileById(id)

  return (
    <div className="mx-[4%]">
      {user ? (
        <div className="flex justify-center items-center">
          <ServiceProviderUser {...user}
          />

        </div>
      ) : (
        <h2 className="w-full pt-[20vh] text-center">Usuario no encontrado</h2>
      )}
    </div>
  );
};

export default SlugProduct;
