import Link from "next/link";
import { motion } from "framer-motion";
import { Info, Shield, FileText, Mail } from "lucide-react";

const linkVariants = {
  hover: {
    scale: 1.05,
    color: "hsl(var(--primary))",
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/20">
      <div className="container mx-auto px-4 lg:px-36 md:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 text-sm"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted-foreground"
          >
            © 2024{" "}
            <Link
              href="https://flowbite.com/"
              className="font-semibold text-foreground hover:text-primary transition-colors duration-200"
            >
              BestFood.com™
            </Link>
            . All Rights Reserved.
          </motion.span>
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted-foreground"
          >
            <motion.li variants={linkVariants} whileHover="hover">
              <Link href="#" className="flex items-center gap-1 hover:text-primary transition-colors duration-200">
                <Info className="w-3 h-3" />
                About
              </Link>
            </motion.li>
            <motion.li variants={linkVariants} whileHover="hover">
              <Link href="#" className="flex items-center gap-1 hover:text-primary transition-colors duration-200">
                <Shield className="w-3 h-3" />
                Privacy Policy
              </Link>
            </motion.li>
            <motion.li variants={linkVariants} whileHover="hover">
              <Link href="#" className="flex items-center gap-1 hover:text-primary transition-colors duration-200">
                <FileText className="w-3 h-3" />
                Licensing
              </Link>
            </motion.li>
            <motion.li variants={linkVariants} whileHover="hover">
              <Link href="#" className="flex items-center gap-1 hover:text-primary transition-colors duration-200">
                <Mail className="w-3 h-3" />
                Contact
              </Link>
            </motion.li>
          </motion.ul>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;