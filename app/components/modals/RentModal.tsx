"use client";
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [steps, setSteps] = useState(STEPS.CATEGORY);
  const[isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch('category');
  const location = watch('location');
  const guestCounts = watch('guestCount')
  const roomCounts = watch('roomCount')
  const bathroomtCounts = watch('bathroomCount')
  const imageSrc = watch('imageSrc') 




  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }),[location])

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setSteps((value) => value - 1);
  };

  const onNext = () => {
    setSteps((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (steps === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [steps]);

  const secondaryActionLabel = useMemo(() => {
    if (steps === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [steps]);

  let bodyContent = (
    <div
      className="
        flex flex-col gap-8
        "
    >
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />

      <div
        className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
            max-h-[50vh]
            overflow-y-auto
            "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (steps === STEPS.LOCATION) {
    bodyContent = (
        <div
        className=" flex flex-col gap-8">
            <Heading 
            title="Where is your place located?"
            subtitle="Help guests find you!"
            />

            <CountrySelect 
            value={location}
            onChange={(value) => setCustomValue('location',value)}
            />
            <Map
            center={location?.latlng} />
        </div>
    )
  }

  if ( steps === STEPS.INFO){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
        title="Share some basics about your place "
        subtitle="What amenities do you have?"
      />
      <hr />
      <Counter 
      value={guestCounts}
      title="Guests"
      subtitle="How many do you allow?"
      onChange={(value) => setCustomValue('guestCount',value)}
      />
      <hr />
      <Counter 
      value={roomCounts}
      title="Rooms"
      subtitle="How many rooms do you have?"
      onChange={(value) => setCustomValue('roomCount',value)}
      />
      <hr />
      <Counter 
      value={bathroomtCounts}
      title="Bathrooms"
      subtitle="How many bathroom do you have?"
      onChange={(value) => setCustomValue('bathroomCount',value)}
      />
      </div>
    )
  }

  if (steps === STEPS.IMAGES){
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading 
         title= "Add phot of your place"
         subtitle="Show guests what your place looks like!" />
         < ImageUpload 
         value={imageSrc}
         onChange={(value) => setCustomValue('imageSrc',value)}
         />
      </div>
    )
  }

  if(steps === STEPS.DESCRIPTION){
    bodyContent=(
      <div className=" flex flex-col gap-8">
        <Heading
        title="How would you describe your place"
        subtitle="Short and sweet works best"
        />
        <Input
        id="title"
        label="title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <hr />
        <Input
        id="description"
        label="description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />

      </div>
    )
  }

  

  
  return (
    <div>
      <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={onNext}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
        title="Airbnb your home!"
        body={bodyContent}
      />
    </div>
  );
};

export default RentModal;
