export default function HtmlBlock({ html }) {
  return (
    <div
      style={styles.wrapper}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

const styles = {
  wrapper: {
    width: '100%',
  },
};
