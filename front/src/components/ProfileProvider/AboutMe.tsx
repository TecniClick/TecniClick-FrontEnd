export const AboutMe = ({ description }: { description: string }) => (
    <section className="p-4">
      <h3 className="text-lg font-semibold mb-2">Sobre mí</h3>
      <p className="text-sm text-gray-700">{description}</p>
    </section>
  );
  