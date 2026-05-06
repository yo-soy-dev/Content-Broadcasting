// // "use client";

// // import { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { z } from "zod";
// // import { useUploadContent } from "@/hooks/useContent";
// // import { useRouter } from "next/navigation";
// // import { ROUTES } from "@/config/routes";
// // import { UploadCloud } from "lucide-react";
// // import { useMyScreens } from "@/hooks/useScreen";

// // const uploadSchema = z
// //   .object({
// //     title: z.string().min(1, "Title is required"),
// //     subject: z.string().min(1, "Subject is required"),
// //     description: z.string().optional(),
// //     startTime: z.string().min(1, "Start time is required"),
// //     endTime: z.string().min(1, "End time is required"),
// //     rotationDuration: z.string().optional(),
// //     screen: z.string().min(1, "Screen is required"),
// //   })
// //   .refine((d) => new Date(d.endTime) > new Date(d.startTime), {
// //     message: "End time must be after start time",
// //     path: ["endTime"],
// //   });

// // type UploadFormData = z.infer<typeof uploadSchema>;

// // const SUBJECTS = ["Mathematics", "Science", "History", "Other"];
// // const MAX_SIZE = 10 * 1024 * 1024;
// // const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

// // export default function UploadForm() {
// //   const [file, setFile] = useState<File | null>(null);
// //   const [preview, setPreview] = useState<string | null>(null);
// //   const [fileError, setFileError] = useState("");

// //   const router = useRouter();
// //   const { mutate, isPending } = useUploadContent();
// //   const { data: screens } = useMyScreens();

// //   const {
// //     register,
// //     handleSubmit,
// //     reset,
// //     formState: { errors },
// //   } = useForm<UploadFormData>({
// //     resolver: zodResolver(uploadSchema),
// //   });

// //   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const f = e.target.files?.[0];
// //     setFileError("");
// //     if (!f) return;

// //     if (!ALLOWED_TYPES.includes(f.type)) {
// //       return setFileError("Invalid file type");
// //     }
// //     if (f.size > MAX_SIZE) {
// //       return setFileError("File too large");
// //     }

// //     setFile(f);
// //     setPreview(URL.createObjectURL(f));
// //   };

// //   const onSubmit = (data: UploadFormData) => {
// //     if (!file) return setFileError("File required");

// //     const formData = new FormData();

// //     formData.append("title", data.title);
// //     formData.append("subject", data.subject);
// //     formData.append("description", data.description || "");
// //     formData.append("startTime", data.startTime);
// //     formData.append("endTime", data.endTime);
// //     formData.append("screen", data.screen);

// //     formData.append(
// //       "rotationDuration",
// //       String(data.rotationDuration || 10)
// //     );

// //     formData.append("file", file);

// //     mutate(formData, {
// //       onSuccess: () => {
// //         reset();
// //         setFile(null);
// //         setPreview(null);
// //         router.push(ROUTES.TEACHER.MY_CONTENT);
// //       },
// //     });
// //   };

// //   return (
// //     <div className="max-w-3xl mx-auto space-y-6">

// //       {/* HEADER */}
// //       <div>
// //         <h2 className="text-2xl font-semibold text-gray-800">
// //           Upload Content
// //         </h2>
// //         <p className="text-sm text-gray-500">
// //           Add new educational content for broadcasting
// //         </p>
// //       </div>

// //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

// //         {/* BASIC INFO */}
// //         <div className="bg-white border rounded-2xl p-5 space-y-4 shadow-sm">

// //           <input
// //             {...register("title")}
// //             placeholder="Title"
// //             className="input"
// //           />
// //           {errors.title && <p className="error">{errors.title.message}</p>}

// //           <select {...register("subject")} className="input">
// //             <option value="">Select subject</option>
// //             {SUBJECTS.map((s) => (
// //               <option key={s}>{s}</option>
// //             ))}
// //           </select>

// //           <textarea
// //             {...register("description")}
// //             placeholder="Description"
// //             className="input"
// //           />

// //           {/* SCREEN DROPDOWN ⭐ NEW */}
// //           <select {...register("screen")} className="input">
// //             <option value="">Select Screen</option>
// //             {screens?.map((s: any) => (
// //               <option key={s._id} value={s._id}>
// //                 {s.name}
// //               </option>
// //             ))}
// //           </select>

// //           {errors.screen && (
// //             <p className="error">{errors.screen.message}</p>
// //           )}
// //         </div>

// //         {/* SCHEDULE */}
// //         <div className="bg-white border rounded-2xl p-5 space-y-4 shadow-sm">

// //           <div className="grid grid-cols-2 gap-4">
// //             <input type="datetime-local" {...register("startTime")} className="input" />
// //             <input type="datetime-local" {...register("endTime")} className="input" />
// //           </div>

// //           {errors.endTime && (
// //             <p className="error">{errors.endTime.message}</p>
// //           )}

// //           <input
// //             type="number"
// //             {...register("rotationDuration")}
// //             placeholder="Rotation (seconds)"
// //             className="input"
// //           />
// //         </div>

// //         {/* FILE UPLOAD */}
// //         <div className="bg-white border rounded-2xl p-5 space-y-4 shadow-sm">

// //           <label className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer">
// //             <UploadCloud size={32} className="text-gray-400 mb-2" />
// //             <p className="text-sm text-gray-500">
// //               Click to upload or drag & drop
// //             </p>
// //             <input type="file" hidden onChange={handleFile} />
// //           </label>

// //           {preview && (
// //             <img
// //               src={preview}
// //               className="h-40 rounded-lg object-contain mx-auto"
// //             />
// //           )}

// //           {fileError && <p className="error">{fileError}</p>}
// //         </div>

// //         {/* SUBMIT */}
// //         <button
// //           type="submit"
// //           disabled={isPending}
// //           className="w-full bg-black text-white py-3 rounded-xl font-medium"
// //         >
// //           {isPending ? "Uploading..." : "Upload Content"}
// //         </button>

// //       </form>
// //     </div>
// //   );
// // }



// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useUploadContent } from "@/hooks/useContent";
// import { useRouter } from "next/navigation";
// import { ROUTES } from "@/config/routes";
// import { UploadCloud, X, ImageIcon, Calendar, AlignLeft } from "lucide-react";
// import { SCREEN_OPTIONS, SUBJECTS } from "@/constants/formOptions";

// const uploadSchema = z
//   .object({
//     title: z.string().min(1, "Title is required"),
//     subject: z.string().min(1, "Subject is required"),
//     description: z.string().optional(),
//     startTime: z.string().min(1, "Start time is required"),
//     endTime: z.string().min(1, "End time is required"),
//     rotationDuration: z.string().optional(),
//     screen: z.string().min(1, "Screen is required"),
//   })
//   .refine((d) => new Date(d.endTime) > new Date(d.startTime), {
//     message: "End time must be after start time",
//     path: ["endTime"],
//   });

// type UploadFormData = z.infer<typeof uploadSchema>;

// const MAX_SIZE = 10 * 1024 * 1024;
// const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

// function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
//   return (
//     <div className="flex items-center gap-2 mb-4">
//       <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
//         <Icon size={14} className="text-indigo-600" />
//       </div>
//       <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
//     </div>
//   );
// }

// const inputCls = (hasError?: boolean) =>
//   `w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200
//   focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
//   ${hasError
//     ? "border-red-300 bg-red-50 text-red-900 placeholder:text-red-300"
//     : "border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 hover:border-gray-300"
//   }`;

// const labelCls = "block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5";

// export default function UploadForm() {
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [fileError, setFileError] = useState("");
//   const [isDragging, setIsDragging] = useState(false);

//   const router = useRouter();
//   const { mutate, isPending } = useUploadContent();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<UploadFormData>({ resolver: zodResolver(uploadSchema) });

//   const processFile = (f: File) => {
//     setFileError("");
//     if (!ALLOWED_TYPES.includes(f.type)) return setFileError("Only JPG, PNG, and GIF files are allowed");
//     if (f.size > MAX_SIZE) return setFileError("File size must be under 10MB");
//     setFile(f);
//     setPreview(URL.createObjectURL(f));
//   };

//   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0];
//     if (f) processFile(f);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const f = e.dataTransfer.files?.[0];
//     if (f) processFile(f);
//   };

//   const clearFile = () => {
//     setFile(null);
//     setPreview(null);
//     setFileError("");
//   };

//   const onSubmit = (data: UploadFormData) => {
//     if (!file) return setFileError("Please select a file to upload");

//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("subject", data.subject);
//     formData.append("description", data.description || "");
//     formData.append("startTime", data.startTime);
//     formData.append("endTime", data.endTime);
//     formData.append("screen", data.screen);
//     formData.append("rotationDuration", String(data.rotationDuration || 10));
//     formData.append("file", file);

//     mutate(formData, {
//       onSuccess: () => {
//         reset();
//         setFile(null);
//         setPreview(null);
//         router.push(ROUTES.TEACHER.MY_CONTENT);
//       },
//     });
//   };

//   return (
//     <div className="max-w-3xl mx-auto">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

//         {/* Basic Info */}
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
//           <SectionHeader icon={AlignLeft} title="Basic Information" />
//           <div className="space-y-4">
//             <div>
//               <label className={labelCls}>Title *</label>
//               <input
//                 {...register("title")}
//                 placeholder="e.g. Chapter 5 — Photosynthesis"
//                 className={inputCls(!!errors.title)}
//               />
//               {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className={labelCls}>Subject *</label>
//                 <select {...register("subject")} className={inputCls(!!errors.subject)}>
//                   <option value="">Select subject</option>
//                   {SUBJECTS.map((s) => (
//                     <option key={s} value={s}>{s}</option>
//                   ))}
//                 </select>
//                 {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
//               </div>

//               <div>
//                 <label className={labelCls}>Screen *</label>
//                 <select {...register("screen")} className={inputCls(!!errors.screen)}>
//                   <option value="">Select screen</option>
//                   {SCREEN_OPTIONS.map((s) => (
//                     <option key={s.value} value={s.value}>{s.label}</option>
//                   ))}
//                 </select>
//                 {errors.screen && <p className="mt-1 text-xs text-red-500">{errors.screen.message}</p>}
//               </div>
//             </div>

//             <div>
//               <label className={labelCls}>Description</label>
//               <textarea
//                 {...register("description")}
//                 placeholder="Brief description of the content (optional)"
//                 rows={3}
//                 className={inputCls(false) + " resize-none"}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Schedule */}
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
//           <SectionHeader icon={Calendar} title="Schedule" />
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className={labelCls}>Start time *</label>
//                 <input type="datetime-local" {...register("startTime")} className={inputCls(!!errors.startTime)} />
//                 {errors.startTime && <p className="mt-1 text-xs text-red-500">{errors.startTime.message}</p>}
//               </div>
//               <div>
//                 <label className={labelCls}>End time *</label>
//                 <input type="datetime-local" {...register("endTime")} className={inputCls(!!errors.endTime)} />
//                 {errors.endTime && <p className="mt-1 text-xs text-red-500">{errors.endTime.message}</p>}
//               </div>
//             </div>
//             <div>
//               <label className={labelCls}>Rotation duration (seconds)</label>
//               <input
//                 type="number"
//                 min={5}
//                 {...register("rotationDuration")}
//                 placeholder="10"
//                 className={inputCls(false) + " max-w-xs"}
//               />
//               <p className="mt-1 text-xs text-gray-400">How long to display before rotating. Default: 10s</p>
//             </div>
//           </div>
//         </div>

//         {/* File Upload */}
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
//           <SectionHeader icon={ImageIcon} title="Content File" />

//           {!preview ? (
//             <label
//               onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
//               onDragLeave={() => setIsDragging(false)}
//               onDrop={handleDrop}
//               className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl
//                 p-10 cursor-pointer transition-all duration-200
//                 ${isDragging
//                   ? "border-indigo-400 bg-indigo-50"
//                   : "border-gray-200 bg-gray-50/50 hover:border-indigo-300 hover:bg-indigo-50/30"
//                 }`}
//             >
//               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors
//                 ${isDragging ? "bg-indigo-100" : "bg-gray-100"}`}>
//                 <UploadCloud size={22} className={isDragging ? "text-indigo-500" : "text-gray-400"} />
//               </div>
//               <div className="text-center">
//                 <p className="text-sm font-semibold text-gray-700">
//                   {isDragging ? "Drop it here!" : "Click to upload or drag & drop"}
//                 </p>
//                 <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, GIF — max 10MB</p>
//               </div>
//               <input type="file" hidden accept=".jpg,.jpeg,.png,.gif" onChange={handleFile} />
//             </label>
//           ) : (
//             <div className="relative">
//               <div className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center" style={{ minHeight: 200 }}>
//                 <img src={preview} alt="Preview" className="max-h-64 w-full object-contain" />
//               </div>
//               <div className="absolute top-3 right-3 flex items-center gap-2">
//                 <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 shadow-sm">
//                   {file?.name}
//                 </div>
//                 <button
//                   type="button"
//                   onClick={clearFile}
//                   className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm
//                     flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors"
//                 >
//                   <X size={14} />
//                 </button>
//               </div>
//             </div>
//           )}

//           {fileError && (
//             <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
//               <span className="w-3.5 h-3.5 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">!</span>
//               {fileError}
//             </p>
//           )}
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={isPending}
//           className="w-full py-3 px-6 bg-indigo-600 text-white text-sm font-semibold rounded-xl
//             hover:bg-indigo-700 active:scale-[0.98] transition-all duration-150
//             shadow-lg shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none
//             flex items-center justify-center gap-2"
//         >
//           {isPending ? (
//             <>
//               <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               Uploading...
//             </>
//           ) : (
//             <>
//               <UploadCloud size={16} />
//               Upload Content
//             </>
//           )}
//         </button>

//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUploadContent } from "@/hooks/useContent";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { UploadCloud, X, ImageIcon, Calendar, AlignLeft } from "lucide-react";
import { SCREEN_OPTIONS, SUBJECTS } from "@/constants/formOptions";

const uploadSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    subject: z.string().min(1, "Subject is required"),
    description: z.string().optional(),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    rotationDuration: z.string().optional(),
    screen: z.string().min(1, "Screen is required"),
  })
  .refine((d) => new Date(d.endTime) > new Date(d.startTime), {
    message: "End time must be after start time",
    path: ["endTime"],
  });

type UploadFormData = z.infer<typeof uploadSchema>;

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-900/30
        flex items-center justify-center">
        <Icon size={14} className="text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
    </div>
  );
}

const inputCls = (hasError?: boolean) =>
  `w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200
  focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
  dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500
  ${hasError
    ? "border-red-300 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-300 placeholder:text-red-300"
    : "border-gray-200 dark:border-gray-600 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500"
  }`;

const labelCls = "block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const router = useRouter();
  const { mutate, isPending } = useUploadContent();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UploadFormData>({ resolver: zodResolver(uploadSchema) });

  const processFile = (f: File) => {
    setFileError("");
    if (!ALLOWED_TYPES.includes(f.type)) return setFileError("Only JPG, PNG, and GIF files are allowed");
    if (f.size > MAX_SIZE) return setFileError("File size must be under 10MB");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) processFile(f);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setFileError("");
  };

  const onSubmit = (data: UploadFormData) => {
    if (!file) return setFileError("Please select a file to upload");
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subject", data.subject);
    formData.append("description", data.description || "");
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);
    formData.append("screen", data.screen);
    formData.append("rotationDuration", String(data.rotationDuration || 10));
    formData.append("file", file);

    mutate(formData, {
      onSuccess: () => {
        reset();
        setFile(null);
        setPreview(null);
        router.push(ROUTES.TEACHER.MY_CONTENT);
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Basic Info */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100
          dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <SectionHeader icon={AlignLeft} title="Basic Information" />
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Title *</label>
              <input
                {...register("title")}
                placeholder="e.g. Chapter 5 — Photosynthesis"
                className={inputCls(!!errors.title)}
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Subject *</label>
                <select {...register("subject")} className={inputCls(!!errors.subject)}>
                  <option value="">Select subject</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
              </div>
              <div>
                <label className={labelCls}>Screen *</label>
                <select {...register("screen")} className={inputCls(!!errors.screen)}>
                  <option value="">Select screen</option>
                  {SCREEN_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                {errors.screen && <p className="mt-1 text-xs text-red-500">{errors.screen.message}</p>}
              </div>
            </div>

            <div>
              <label className={labelCls}>Description</label>
              <textarea
                {...register("description")}
                placeholder="Brief description of the content (optional)"
                rows={3}
                className={inputCls(false) + " resize-none"}
              />
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100
          dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <SectionHeader icon={Calendar} title="Schedule" />
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Start time *</label>
                <input type="datetime-local" {...register("startTime")}
                  className={inputCls(!!errors.startTime)} />
                {errors.startTime && <p className="mt-1 text-xs text-red-500">{errors.startTime.message}</p>}
              </div>
              <div>
                <label className={labelCls}>End time *</label>
                <input type="datetime-local" {...register("endTime")}
                  className={inputCls(!!errors.endTime)} />
                {errors.endTime && <p className="mt-1 text-xs text-red-500">{errors.endTime.message}</p>}
              </div>
            </div>
            <div>
              <label className={labelCls}>Rotation duration (seconds)</label>
              <input
                type="number"
                min={5}
                {...register("rotationDuration")}
                placeholder="10"
                className={inputCls(false) + " max-w-xs"}
              />
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                How long to display before rotating. Default: 10s
              </p>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100
          dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <SectionHeader icon={ImageIcon} title="Content File" />

          {!preview ? (
            <label
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed
                rounded-2xl p-10 cursor-pointer transition-all duration-200
                ${isDragging
                  ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                  : "border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/30 hover:border-indigo-300 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10"
                }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors
                ${isDragging ? "bg-indigo-100 dark:bg-indigo-900/40" : "bg-gray-100 dark:bg-gray-700"}`}>
                <UploadCloud size={22} className={isDragging ? "text-indigo-500" : "text-gray-400"} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {isDragging ? "Drop it here!" : "Click to upload or drag & drop"}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  JPG, PNG, GIF — max 10MB
                </p>
              </div>
              <input type="file" hidden accept=".jpg,.jpeg,.png,.gif" onChange={handleFile} />
            </label>
          ) : (
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700
                bg-gray-50 dark:bg-gray-700 flex items-center justify-center" style={{ minHeight: 200 }}>
                <img src={preview} alt="Preview" className="max-h-64 w-full object-contain" />
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-1.5
                  text-xs font-medium text-gray-600 dark:text-gray-300
                  border border-gray-200 dark:border-gray-600 shadow-sm">
                  {file?.name}
                </div>
                <button
                  type="button"
                  onClick={clearFile}
                  className="w-8 h-8 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                    border border-gray-200 dark:border-gray-600 shadow-sm
                    flex items-center justify-center text-gray-500 dark:text-gray-400
                    hover:text-red-500 hover:border-red-200 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}

          {fileError && (
            <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded-full bg-red-100 dark:bg-red-900/30
                flex items-center justify-center text-red-500 shrink-0">!</span>
              {fileError}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 px-6 bg-indigo-600 text-white text-sm font-semibold rounded-xl
            hover:bg-indigo-700 active:scale-[0.98] transition-all duration-150
            shadow-lg shadow-indigo-200 dark:shadow-none
            disabled:opacity-60 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <UploadCloud size={16} />
              Upload Content
            </>
          )}
        </button>

      </form>
    </div>
  );
}