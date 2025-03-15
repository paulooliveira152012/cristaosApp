import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: `/${string}` | `https://${string}` };

export function ExternalLink({ href, ...rest }: Props) {
  const isExternal = href.startsWith('http');

  return (
    <Link
      target="_blank"
      {...rest}
      href={href as any} // Se necessário, forçamos o tipo
      onPress={async (event) => {
        if (Platform.OS !== 'web' && isExternal) {
          event.preventDefault();
          await openBrowserAsync(href);
        }
      }}
    />
  );
}
