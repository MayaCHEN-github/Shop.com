export default function DescriptionBullets(props) {
  const { 
    value
  } = props

  // The start of each bullet point is demarcated by the use of a newline character
  // We also filter to remove any empty points
  const bulletPoints = value.split('\n').filter(i => i);

  return (
    <ul style={{ textAlign: "left", padding: 16, paddingTop: 0}}>
      {bulletPoints.map((point, idx) => 
        <li key={idx} style={{ marginBottom: 10}}>{point}</li>
      )}
    </ul>
  )
}
