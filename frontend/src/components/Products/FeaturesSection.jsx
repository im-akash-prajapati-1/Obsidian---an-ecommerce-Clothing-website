import { HiMiniTruck, HiArrowPathRoundedSquare, HiCreditCard, HiMiniStar } from "react-icons/hi2";

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="w-full px-6 sm:px-10 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">

        {/* Feature */}
        <div className="flex flex-col items-center group">
          <div className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-300 mb-5 transition group-hover:bg-black group-hover:text-white">
            <HiMiniTruck className="text-2xl" />
          </div>
          <h4 className="text-sm uppercase tracking-widest text-gray-900 mb-3">
            Fast Delivery
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
            Get your products delivered quickly and efficiently.
          </p>
        </div>

        {/* Feature */}
        <div className="flex flex-col items-center group">
          <div className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-300 mb-5 transition group-hover:bg-black group-hover:text-white">
            <HiArrowPathRoundedSquare className="text-2xl" />
          </div>
          <h4 className="text-sm uppercase tracking-widest text-gray-900 mb-3">
            30 Days Returns
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
            Return items easily with our hassle-free return policy.
          </p>
        </div>

        {/* Feature */}
        <div className="flex flex-col items-center group">
          <div className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-300 mb-5 transition group-hover:bg-black group-hover:text-white">
            <HiCreditCard className="text-2xl" />
          </div>
          <h4 className="text-sm uppercase tracking-widest text-gray-900 mb-3">
            Secure Payments
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
            Make secure payments with our trusted payment system.
          </p>
        </div>

        {/* Feature */}
        <div className="flex flex-col items-center group">
          <div className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-300 mb-5 transition group-hover:bg-black group-hover:text-white">
            <HiMiniStar className="text-2xl" />
          </div>
          <h4 className="text-sm uppercase tracking-widest text-gray-900 mb-3">
            Quality Products
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
            We ensure all products meet the highest quality standards.
          </p>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
