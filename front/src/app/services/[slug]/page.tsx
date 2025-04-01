import ServiceProviderUser from "@/components/ServiceProviderUser/ServiceProviderUser";
import { getUserById } from "@/services/userService";

interface ProductParams {
  slug: string;
}

const SlugProduct = async ({ params }: { params: ProductParams }) => {
  const { slug } = await params;
  const user = await getUserById(slug)

  return (
    <div className="mx-[4%]">
      {user ? (
        <div className="flex justify-center items-center">
          <ServiceProviderUser
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            password={user.password}
            phone={user.phone}
            address={user.address}
            role={user.role}
            interests={user.interests}
            imgUrl={user.imgUrl}
            services={user.services}
            appointments={user.appointments}
            reviews={user.reviews}
            orders={user.orders}
            createdAt={user.createdAt}
            updatedAt={user.updatedAt}
            deletedAt={user.deletedAt}
          />
        </div>
      ) : (
        <h2 className="w-full pt-[20vh] text-center">Usuario no encontrado</h2>
      )}
    </div>
  );
};

export default SlugProduct;
