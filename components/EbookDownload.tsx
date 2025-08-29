// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { BookOpen, Download, CheckCircle } from "lucide-react";

// interface EbookDownloadProps {
//   title: string;
//   description: string;
//   ebookUrl?: string;
// }

// const EbookDownload = ({ title, description, ebookUrl }: EbookDownloadProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: ""
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // TODO: Connect to Supabase to store email and send ebook
//     console.log("Ebook download request:", formData);
//     setIsSubmitted(true);
    
//     // Simulate sending email and providing download
//     setTimeout(() => {
//       setIsOpen(false);
//       setIsSubmitted(false);
//       setFormData({ name: "", email: "" });
//     }, 3000);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline" className="w-full group hover:bg-primary hover:text-primary-foreground transition-colors">
//           <BookOpen className="w-4 h-4 mr-2" />
//           Download Free Ebook
//           <Download className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <BookOpen className="w-5 h-5 text-primary" />
//             {title}
//           </DialogTitle>
//           <DialogDescription>
//             {description}
//           </DialogDescription>
//         </DialogHeader>
        
//         {isSubmitted ? (
//           <div className="text-center py-6">
//             <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold text-green-600 mb-2">
//               Download Link Sent!
//             </h3>
//             <p className="text-sm text-muted-foreground">
//               Check your email for the download link. The ebook will be in your inbox shortly.
//             </p>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//                 className="border-primary/20 focus:border-primary"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email Address</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email address"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//                 className="border-primary/20 focus:border-primary"
//               />
//             </div>
//             <div className="text-xs text-muted-foreground">
//               By downloading, you agree to receive occasional updates about scholarships and opportunities.
//             </div>
//             <Button type="submit" className="w-full">
//               Send Download Link
//             </Button>
//           </form>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EbookDownload;