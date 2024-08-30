import { Button } from "@components/ui/button";

export default () => {
  return (
    <div className="container flex flex-col gap-16 bg-white py-6 text-gray-500 md:flex-row md:py-[96px]">
      <div className="flex flex-col justify-center md:w-[380px] md:min-w-[380px]">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Designed with your data in mind
        </h1>
        <p className="my-4 text-xl font-normal text-gray-500">
          TDC places a strong focus on user-submitted data, empowering
          individuals and organisations to contribute their valuable data to
          drive insights and innovations in sustainable transportation.
        </p>
        <Button className="bg-[#006064] px-6 py-3.5">Add data</Button>
      </div>

      <div className="grid w-full grid-cols-2 grid-rows-2 gap-8">
        <div className="col-span-2 flex gap-8 md:col-span-1 md:flex-col">
          <div className="flex items-center gap-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#E3F9ED]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="26"
                viewBox="0 0 24 26"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.9998 11.4V8.20001C3.9998 6.07828 4.84266 4.04345 6.34295 2.54316C7.84324 1.04287 9.87807 0.200012 11.9998 0.200012C14.1215 0.200012 16.1564 1.04287 17.6567 2.54316C19.157 4.04345 19.9998 6.07828 19.9998 8.20001V11.4C20.8485 11.4 21.6624 11.7372 22.2625 12.3373C22.8627 12.9374 23.1998 13.7513 23.1998 14.6V22.6C23.1998 23.4487 22.8627 24.2626 22.2625 24.8628C21.6624 25.4629 20.8485 25.8 19.9998 25.8H3.9998C3.15111 25.8 2.33718 25.4629 1.73706 24.8628C1.13695 24.2626 0.799805 23.4487 0.799805 22.6V14.6C0.799805 13.7513 1.13695 12.9374 1.73706 12.3373C2.33718 11.7372 3.15111 11.4 3.9998 11.4ZM16.7998 8.20001V11.4H7.19981V8.20001C7.19981 6.92697 7.70552 5.70607 8.60569 4.8059C9.50587 3.90573 10.7268 3.40001 11.9998 3.40001C13.2728 3.40001 14.4937 3.90573 15.3939 4.8059C16.2941 5.70607 16.7998 6.92697 16.7998 8.20001Z"
                  fill="#00ACC1"
                />
              </svg>
            </div>
          </div>
          <section className="space-y-4">
            <h1 className="text-xl font-bold text-gray-900">Data Security</h1>
            <p>
              Rest assured, data posted to TDC is safeguarded with robust
              security measures to ensure the confidentiality and integrity of
              the information.
            </p>
          </section>
        </div>

        <div className="col-span-2 flex gap-8 md:col-span-1 md:flex-col">
          <div className="flex items-center gap-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#E3F9ED]">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2002 4.79999C10.7758 4.79999 10.3689 4.96856 10.0688 5.26862C9.76877 5.56868 9.60019 5.97564 9.60019 6.39999C9.60019 6.82433 9.76877 7.2313 10.0688 7.53136C10.3689 7.83142 10.7758 7.99999 11.2002 7.99999H20.8002C21.2245 7.99999 21.6315 7.83142 21.9316 7.53136C22.2316 7.2313 22.4002 6.82433 22.4002 6.39999C22.4002 5.97564 22.2316 5.56868 21.9316 5.26862C21.6315 4.96856 21.2245 4.79999 20.8002 4.79999H11.2002ZM6.4002 11.2C6.4002 10.7756 6.56877 10.3687 6.86882 10.0686C7.16888 9.76856 7.57585 9.59999 8.0002 9.59999H24.0002C24.4245 9.59999 24.8315 9.76856 25.1316 10.0686C25.4316 10.3687 25.6002 10.7756 25.6002 11.2C25.6002 11.6243 25.4316 12.0313 25.1316 12.3314C24.8315 12.6314 24.4245 12.8 24.0002 12.8H8.0002C7.57585 12.8 7.16888 12.6314 6.86882 12.3314C6.56877 12.0313 6.4002 11.6243 6.4002 11.2ZM3.2002 17.6C3.2002 16.7513 3.53734 15.9374 4.13745 15.3372C4.73757 14.7371 5.5515 14.4 6.4002 14.4H25.6002C26.4489 14.4 27.2628 14.7371 27.8629 15.3372C28.4631 15.9374 28.8002 16.7513 28.8002 17.6V24C28.8002 24.8487 28.4631 25.6626 27.8629 26.2627C27.2628 26.8628 26.4489 27.2 25.6002 27.2H6.4002C5.5515 27.2 4.73757 26.8628 4.13745 26.2627C3.53734 25.6626 3.2002 24.8487 3.2002 24V17.6Z"
                  fill="#00ACC1"
                />
              </svg>
            </div>
          </div>
          <section className="space-y-4">
            <h1 className="text-xl font-bold text-gray-900">
              Data Standardisation
            </h1>
            <p>
              TDC utilises SDMX (Statistical Data and Metadata Exchange) to
              ensure standardised data formats and consistent metadata across
              datasets, promoting interoperability and facilitating effective
              data analysis and comparison.
            </p>
          </section>
        </div>
        <div className="col-span-2 flex gap-8 md:col-span-1 md:flex-col">
          <div className="flex items-center gap-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#E3F9ED]">
              <svg
                width="26"
                height="27"
                viewBox="0 0 26 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.465795 4.9984C5.09801 4.9408 9.55189 3.20393 13.0002 0.110397C16.4483 3.20451 20.9022 4.94196 25.5346 5C25.7106 6.04 25.8002 7.112 25.8002 8.2016C25.8002 16.5616 20.4562 23.6736 13.0002 26.3088C5.5442 23.672 0.200195 16.56 0.200195 8.2C0.200195 7.1088 0.291395 6.04 0.465795 4.9984ZM18.9314 10.9312C19.2228 10.6294 19.3841 10.2253 19.3805 9.80576C19.3768 9.38624 19.2086 8.98494 18.9119 8.68829C18.6153 8.39163 18.214 8.22336 17.7944 8.21972C17.3749 8.21607 16.9708 8.37735 16.669 8.6688L11.4002 13.9376L9.33139 11.8688C9.02963 11.5773 8.62547 11.4161 8.20595 11.4197C7.78644 11.4234 7.38514 11.5916 7.08849 11.8883C6.79183 12.1849 6.62356 12.5862 6.61992 13.0058C6.61627 13.4253 6.77754 13.8294 7.069 14.1312L10.269 17.3312C10.569 17.6312 10.9759 17.7997 11.4002 17.7997C11.8245 17.7997 12.2313 17.6312 12.5314 17.3312L18.9314 10.9312Z"
                  fill="#00ACC1"
                />
              </svg>
            </div>
          </div>
          <section className="space-y-4">
            <h1 className="text-xl font-bold text-gray-900">Stay in control</h1>
            <p>
              You have the control to remove your uploaded data or decline any
              modifications to ensure the integrity and ownership of the data
              you contribute on TDC.
            </p>
          </section>
        </div>
        <div className="col-span-2 flex gap-8 md:col-span-1 md:flex-col">
          <div className="flex items-center gap-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#E3F9ED]">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.6748 3.0576C10.5649 2.64769 10.2967 2.29822 9.92912 2.08608C9.56155 1.87393 9.12476 1.8165 8.71484 1.9264C8.30492 2.03631 7.95545 2.30455 7.74331 2.67213C7.53117 3.0397 7.47374 3.47649 7.58364 3.8864L7.99804 5.432C8.10795 5.84192 8.37619 6.19139 8.74376 6.40353C9.11134 6.61567 9.54812 6.67311 9.95804 6.5632C10.368 6.4533 10.7174 6.18505 10.9296 5.81748C11.1417 5.44991 11.1991 5.01312 11.0892 4.6032L10.6732 3.0576H10.6748ZM3.88604 7.584C3.68272 7.52858 3.47045 7.51386 3.26142 7.54071C3.0524 7.56755 2.85073 7.63543 2.66801 7.74043C2.48529 7.84544 2.32512 7.98551 2.19669 8.15259C2.06825 8.31968 1.9741 8.51049 1.91962 8.71407C1.86514 8.91765 1.85142 9.12999 1.87924 9.33889C1.90706 9.54778 1.97587 9.74913 2.08173 9.93136C2.18758 10.1136 2.3284 10.2731 2.49608 10.4008C2.66376 10.5284 2.85501 10.6217 3.05884 10.6752L4.60444 11.0896C5.01362 11.1971 5.4487 11.1381 5.81452 10.9256C6.18033 10.7131 6.44709 10.3644 6.55645 9.95568C6.66581 9.54701 6.60887 9.11165 6.39808 8.74485C6.18728 8.37806 5.8398 8.10967 5.43164 7.9984L3.88604 7.5824V7.584ZM17.9884 6.6736C18.137 6.52495 18.2548 6.34849 18.3352 6.1543C18.4155 5.96011 18.4568 5.752 18.4568 5.54184C18.4567 5.33168 18.4152 5.1236 18.3347 4.92946C18.2542 4.73533 18.1363 4.55896 17.9876 4.4104C17.839 4.26185 17.6625 4.14404 17.4683 4.06368C17.2741 3.98333 17.066 3.94201 16.8559 3.94208C16.6457 3.94215 16.4376 3.98362 16.2435 4.06411C16.0494 4.14461 15.873 4.26255 15.7244 4.4112L14.5932 5.5424C14.4446 5.69106 14.3267 5.86754 14.2462 6.06177C14.1658 6.256 14.1244 6.46417 14.1244 6.6744C14.1244 6.88464 14.1658 7.09281 14.2462 7.28704C14.3267 7.48127 14.4446 7.65775 14.5932 7.8064C14.7419 7.95506 14.9184 8.07298 15.1126 8.15343C15.3068 8.23389 15.515 8.27529 15.7252 8.27529C15.9355 8.27529 16.1436 8.23389 16.3379 8.15343C16.5321 8.07298 16.7086 7.95506 16.8572 7.8064L17.9884 6.6736ZM6.67484 17.9888L7.80604 16.8576C8.10648 16.5576 8.27543 16.1505 8.27573 15.7259C8.27603 15.3014 8.10766 14.894 7.80764 14.5936C7.50763 14.2932 7.10056 14.1242 6.67597 14.1239C6.25139 14.1236 5.84408 14.292 5.54364 14.592L4.41084 15.7232C4.11062 16.0234 3.94195 16.4306 3.94195 16.8552C3.94195 17.2798 4.11062 17.687 4.41084 17.9872C4.71107 18.2874 5.11826 18.4561 5.54284 18.4561C5.96742 18.4561 6.37462 18.2874 6.67484 17.9872V17.9888ZM11.7948 9.7152C11.5041 9.59882 11.1855 9.57033 10.8787 9.63326C10.5719 9.6962 10.2904 9.84779 10.0689 10.0693C9.84743 10.2907 9.69584 10.5723 9.6329 10.8791C9.56997 11.1859 9.59846 11.5044 9.71484 11.7952L16.1148 27.7952C16.2295 28.0816 16.4245 28.3287 16.6764 28.5068C16.9282 28.6849 17.2262 28.7864 17.5344 28.7991C17.8426 28.8117 18.1479 28.7351 18.4136 28.5783C18.6792 28.4214 18.8938 28.1912 19.0316 27.9152L21.2396 23.5008L26.0684 28.3328C26.3687 28.6328 26.7758 28.8013 27.2002 28.8011C27.6246 28.801 28.0316 28.6322 28.3316 28.332C28.6317 28.0318 28.8001 27.6247 28.8 27.2002C28.7998 26.7758 28.6311 26.3688 28.3308 26.0688L23.5004 21.2368L27.9164 19.0304C28.1919 18.8923 28.4216 18.6775 28.5779 18.412C28.7343 18.1464 28.8106 17.8414 28.7978 17.5335C28.7849 17.2256 28.6835 16.928 28.5055 16.6764C28.3276 16.4248 28.0808 16.2299 27.7948 16.1152L11.7948 9.7152Z"
                  fill="#00ACC1"
                />
              </svg>
            </div>
          </div>
          <section className="space-y-4">
            <h1 className="text-xl font-bold text-gray-900">
              Enhance your data
            </h1>
            <p>
              TDC offers data curation services to help ensure the quality,
              accuracy, and relevance of your data, maximising its value and
              impact in the realm of sustainable transportation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
